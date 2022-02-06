import {
  Button,
  styled,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import summary from "../../__mocks__/summary";
import { ExportPopup } from "./export-popup";

const SummaryCard = styled(Card)({
  background: "#FEFEEE",
  color: "#000000",
});

const SummaryCardButton = styled(Button)({
  background: "#FFFFD4",
  color: "#000000",
  fontWeight: "bold",
  borderRadius: "12px",
  fontSize: "20px",
  marginLeft: "auto", // card버튼 오른쪽으로 보냄
  "&:hover": {
    backgroundColor: "#FFFFD4",
    color: "#808080",
  },
});

export function SummaryResultCard() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SummaryCard sx={{ mt: 1 }}>
      <CardHeader title="Summary" />
      <CardContent>
        <Grid align="left" sx={{ overflow: "auto", height: "25vh" }}>
          {summary.map((item, idx) => (
            <Grid
                key={idx}
                item
            >
              <Grid>
                <Typography variant="h6">
                  {`${idx + 1}. ${item.section}`}
                </Typography>
              </Grid>
              {item.contents.map((content, num) => (
                <Grid>
                  <Typography variant="value">
                    {`\u00a0\u00a0\u00a0${num + 1}) ${content}`}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <SummaryCardButton onClick={handleClickOpen}>Export</SummaryCardButton>
      </CardActions>
      <ExportPopup handleClose={handleClose} open={open} />
    </SummaryCard>
  );
}
