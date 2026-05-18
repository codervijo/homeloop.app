import { Box, Container, Typography, Button, Stack, Card, CardContent, Grid, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const features = [
  { icon: <GavelRoundedIcon />, title: "Compliance Autopilot", desc: "File your PSA in minutes. Stay legal without the paperwork stress." },
  { icon: <SchoolRoundedIcon />, title: "Daily Student Dashboard", desc: "A simple, kid-friendly view that gives every day structure." },
  { icon: <DescriptionRoundedIcon />, title: "Transcript Generator", desc: "Auto-build transcripts and GPA from the work you've already tracked." },
];

const problems = [
  { title: "Paperwork is confusing", desc: "Filing affidavits and tracking laws shouldn't take a weekend." },
  { title: "Kids lack structure", desc: "Without a daily plan, momentum slips and frustration grows." },
  { title: "Tracking progress is hard", desc: "Spreadsheets and sticky notes aren't a long-term record." },
];

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <Box sx={{ background: "linear-gradient(180deg, #EEF4FE 0%, #FAFBFD 100%)" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 }, textAlign: "center" }}>
          <Chip label="Built for homeschool families" color="primary" variant="outlined" sx={{ mb: 3 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: "2.25rem", md: "3.5rem" }, mb: 2 }}>
            Run your homeschool with clarity.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: "auto", fontWeight: 400, mb: 4 }}>
            Compliance, daily planning, and transcripts — all in one place.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button component={Link} to="/dashboard" variant="contained" size="large">Start Free</Button>
            <Button component={Link} to="/compliance" variant="outlined" size="large">See Compliance</Button>
          </Stack>
        </Container>
      </Box>

      {/* Problem */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="overline" color="primary">The problem</Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mb: 5, mt: 1 }}>
          Homeschooling shouldn't feel like running three jobs.
        </Typography>
        <Grid container spacing={3}>
          {problems.map((p) => (
            <Grid item xs={12} md={4} key={p.title}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>{p.title}</Typography>
                  <Typography color="text.secondary">{p.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Solution + Features */}
      <Box sx={{ bgcolor: "secondary.main" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" color="primary">The solution</Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mt: 1 }}>
              Homeloom simplifies everything into one system.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid item xs={12} md={4} key={f.title}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", mb: 2 }}>
                      {f.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>{f.title}</Typography>
                    <Typography color="text.secondary">{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Footer */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, mb: 2 }}>
          Ready for a calmer school year?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Join families using Homeloom to file, plan, and track — without the chaos.
        </Typography>
        <Button component={Link} to="/dashboard" variant="contained" size="large">Start Free</Button>
      </Container>
    </>
  );
}
