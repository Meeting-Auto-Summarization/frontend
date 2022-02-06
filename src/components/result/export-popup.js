import {
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Description, Close } from "@mui/icons-material";
import word from "../../icons/word.png";

export function ExportPopup(props) {
  const { handleClose, open } = props;
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>양식 선택</DialogTitle>
      {open ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
      <DialogContent>
        <IconButton>
          <Grid>
            <Grid item>
              <img src={word} width="100" height="100" alt="testA" />
            </Grid>
            <Grid item>
              <Typography
                variant="button"
                color="text.primary"
                sx={{ display: "inline" }}
              >
                {`\u00a0\u00a0\u00a0\u00a0`}docx
              </Typography>
            </Grid>
          </Grid>
        </IconButton>
        <IconButton>
          <Grid>
            <Grid item>
              <Description sx={{ fontSize: 100 }} />
            </Grid>
            <Grid item>
              <Typography
                variant="button"
                color="text.primary"
                sx={{ display: "inline" }}
              >
                txt
              </Typography>
            </Grid>
          </Grid>
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
