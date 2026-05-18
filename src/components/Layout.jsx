import { AppBar, Toolbar, Box, Button, Container, Typography, Stack, IconButton, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/compliance", label: "Compliance" },
  { to: "/transcript", label: "Transcript" },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: "primary.main", display: "grid", placeItems: "center", color: "#fff" }}>
                <HomeRoundedIcon fontSize="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Homeloom</Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
              {links.map((l) => (
                <Button
                  key={l.to}
                  component={Link}
                  to={l.to}
                  color={loc.pathname.startsWith(l.to) ? "primary" : "inherit"}
                  variant={loc.pathname.startsWith(l.to) ? "contained" : "text"}
                  size="small"
                >
                  {l.label}
                </Button>
              ))}
            </Stack>

            <IconButton sx={{ display: { xs: "inline-flex", md: "none" } }} onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} onClick={() => setOpen(false)}>
          <List>
            {links.map((l) => (
              <ListItemButton key={l.to} component={Link} to={l.to}>
                <ListItemText primary={l.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>

      <Box component="footer" sx={{ py: 4, mt: 8, borderTop: "1px solid #eef1f6", textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Homeloom · The operating system for homeschool families</Typography>
      </Box>
    </Box>
  );
}
