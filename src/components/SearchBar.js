import {
    Box,
    IconButton,
    InputBase,
    Paper,
    useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSuggestSearch } from 'react-query/search';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import SuggestionItem from './SuggestionItem';
import RecentSearchItem from './RecentSearchItem';
import { searchState } from 'recoil/search';
import { useEffect, useState } from 'react';
import axiosInstance from 'api/axiosInstance';
import { getSuggestSearch } from 'api/search';

function SearchList(props) {
    const { search, onSearch, keywords, handleRemoveKeyword } = props;
    console.log('검색어입니다.', search);
    const [isSuggest, setIsSuggest] = useState(search.length > 0);
    const { suggests, isLoading, isError } = useSuggestSearch(search);

    console.log('suggests', suggests);
    console.log('serach.length', search.length);
    if (search.length > 0) {
        return suggests?.map((suggestion, index) => (
            <SuggestionItem
                key={index}
                keyword={suggestion}
                onSearch={onSearch}
            />
        ));
    } else {
        return keywords?.map((keyword, index) => (
            <RecentSearchItem
                key={index}
                keyword={keyword}
                onSearch={onSearch}
                handleRemoveKeyword={handleRemoveKeyword}
            />
        ));
    }
}

export default function SearchBar({ setSearchKeyword }) {
    const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const navigate = useNavigate();
    // const keywords = ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5'];
    const [search, setSearch] = useState('');

    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem('keywords') || '[]')
    );

    //keyword에 변화가 일어날때만 랜더링
    useEffect(() => {
        //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
        localStorage.setItem('keywords', JSON.stringify(keywords));
    }, [keywords]);

    const handleRemoveKeyword = (keyword) => {
        const nextKeyword = keywords.filter((k) => k !== keyword);
        console.log('JnextKeyword', nextKeyword);
        setKeywords(nextKeyword);
    };

    const onSearch = (keyword) => {
        console.log('text', keyword);

        // keywords.includes(keyword) &&
        //     keywords.splice(keywords.indexOf(keyword), 1);
        // setKeywords([keyword, ...keywords]);

        setKeywords((prevKeywords) => {
            let newKeywords;
            const index = prevKeywords.indexOf(keyword);
            if (index !== -1) {
                newKeywords = [
                    keyword,
                    ...prevKeywords.slice(0, index),
                    ...prevKeywords.slice(index + 1),
                ];
            } else {
                newKeywords = [keyword, ...prevKeywords.slice(0, 4)];
            }
            return newKeywords;
        });
        setSearchKeyword(keyword);
        setSearch(keyword);
        setFocused(false);
        console.log('검색어:', keyword);
    };
    // const { suggests, isLoading, isError } = useSuggestSearch(search);

    const [suggests, setSuggests] = useState([]);
    const [focused, setFocused] = useRecoilState(searchState);
    const [isSuggest, setIsSuggest] = useState(false);
    useEffect(() => {
        console.log('focused:', focused);
    }, [focused]);

    // useEffect(() => {
    //     axiosInstance
    //         .get(`/suggest/keywords?keyword=${search}`)
    //         .then((res) => {
    //             setSuggests(res.data.data);
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     console.log('검색어 있음?', search.length > 0 ? '있음' : '없음');

    //     if (search.length > 0) {
    //         setIsSuggest(true);
    //     } else {
    //         setIsSuggest(false);
    //     }
    // }, [search]);

    return (
        <Box
            sx={{
                position: 'fixed',
                width: isSm ? '90%' : '50%',
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="검색어를 입력하세요"
                    inputProps={{ enterKeyHint: 'search' }}
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearch(search);
                        }
                    }}
                    onChange={(e) => {
                        setSearch(e.target.value);

                        setFocused(true);
                    }}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => {
                        onSearch(search);
                    }}
                >
                    <SearchIcon color="primary" />
                </IconButton>
            </Paper>
            {focused && (
                <Box
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                >
                    {/* {isSuggest
                        ? suggests?.map((suggestion, index) => (
                              <SuggestionItem
                                  key={index}
                                  keyword={suggestion}
                                  onSearch={onSearch}
                              />
                          ))
                        : keywords?.map((keyword, index) => (
                              <RecentSearchItem
                                  key={index}
                                  keyword={keyword}
                                  onSearch={onSearch}
                              />
                          ))} */}
                    <SearchList
                        search={search}
                        onSearch={onSearch}
                        keywords={keywords}
                        handleRemoveKeyword={handleRemoveKeyword}
                    />
                </Box>
            )}
        </Box>
    );
}
