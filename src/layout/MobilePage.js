import MobileLayout from "./MobileLayout";
import { Outlet } from "react-router-dom";

export default function MobilePage() {
  return (
    <MobileLayout>
      <Outlet />
    </MobileLayout>
  );
}
