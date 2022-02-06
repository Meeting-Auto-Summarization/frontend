import { Button, styled, Box, Container } from "@mui/material";
import { MainBar } from "../MainBar";

const NavButton = styled(Button)({
  background: "#F1FAEE",
  borderColor: "#000000",
  color: "#000000",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FEDDFE",
    color: "#808080",
  },
});

export function MainNav() {
  return (
    <MainBar color="default" sx={{}}>
      <Container>
        <Box sx={{ flexGrow: 1, textAlign: "left" }}>
          <img src="/static/images/logo.png" width="60" height="60" align="left" alt="testA" />
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
          <NavButton href="#!" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            My Info
          </NavButton>
          <NavButton href="#!" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </NavButton>
        </Box>
      </Container>
    </MainBar>
  );
}
