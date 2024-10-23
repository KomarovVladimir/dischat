import { Paper as MuiPaper, styled } from "@mui/material";

export const Paper = styled(MuiPaper)({
  borderRadius: "8px",
  border: " 1px solid #383c47",
  background: "rgba(203, 227, 255, 0.10)",
  boxShadow: "8px 16px 24px 0px rgba(0, 0, 0, 0.16)",
  backdropFilter: "blur(8px)"
});
