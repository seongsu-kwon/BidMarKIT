import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { usePostAnswer } from "react-query/qna";

export default function QnaAccordion(props) {
  const { expanded, handleChange, question, isSeller } = props;

  const { questionId, memberId, content, createdAt, ansContent, ansCreatedAt } =
    question;

  const [exp, setExp] = useState(false);

  const { mutate: postAnswer } = usePostAnswer();

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (expanded === questionId) {
      if (ansContent) {
        setExp(true);
      } else if (isSeller) {
        setExp(true);
      } else {
        setExp(false);
      }
    } else {
      setExp(false);
    }
  }, [expanded, questionId, ansContent, isSeller, exp]);

  const handleAnswer = async () => {
    try {
      await Promise.all([
        postAnswer({ questionId: Number(questionId), content: answer }),
      ]);
    } catch (e) {
      console.error(e);
    }
    setExp(false);
    // window.location.reload();
  };

  return (
    <Accordion expanded={exp} onChange={handleChange(questionId)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Chip label="질문" color="primary" />
            <Typography variant="h6" sx={{ m: 1 }}>
              {memberId}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ p: 1 }}>
            {content}
          </Typography>
        </Box>
      </AccordionSummary>

      {ansContent ? (
        <AccordionDetails>
          <Chip label="답변" color="secondary" />
          <Typography variant="body2" sx={{ p: 1 }}>
            {ansContent}
          </Typography>
        </AccordionDetails>
      ) : (
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="답변"
              fullWidth
              multiline
              rows={4}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <Button variant="outlined" sx={{ flex: 1 }} onClick={handleAnswer}>
              등록
            </Button>
          </Box>
        </AccordionDetails>
      )}
    </Accordion>
  );
}
