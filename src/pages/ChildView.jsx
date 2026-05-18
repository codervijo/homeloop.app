import { Container, Typography, Box, Stack, Button, Card, CardContent, LinearProgress, Chip } from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../store";
import { trackChildViewed, trackTaskCompleted } from "../analytics/ga";

export default function ChildView() {
  const { id } = useParams();
  const { state, toggleTask } = useStore();
  const child = state.children.find((c) => c.id === id);

  useEffect(() => {
    if (id) trackChildViewed(id);
  }, [id]);

  const handleToggle = (task) => {
    if (!task.completed) trackTaskCompleted(task.subject, task.childId);
    toggleTask(task.id);
  };
  const today = new Date().toISOString().slice(0, 10);
  const tasks = state.tasks.filter((t) => t.childId === id && t.date === today);
  const done = tasks.filter((t) => t.completed).length;
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const streak = state.streaks[id] || 0;
  const reward = pct === 100 ? "🏆 Day Complete!" : pct >= 50 ? "⭐ Halfway there!" : "💪 Keep going!";

  if (!child) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Child not found</Typography>
        <Button component={Link} to="/dashboard" sx={{ mt: 2 }}>Back to Dashboard</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Box sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        background: "linear-gradient(135deg, #4F8EF7 0%, #6BA5FF 100%)",
        color: "#fff",
        mb: 4,
      }}>
        <Typography variant="overline" sx={{ opacity: 0.8 }}>Hi {child.name}! Here's your day</Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
          {done} / {tasks.length} done
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
          <Chip
            icon={<LocalFireDepartmentRoundedIcon sx={{ color: "#fff !important" }} />}
            label={`${streak} day streak`}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600 }}
          />
          <Chip
            icon={<EmojiEventsRoundedIcon sx={{ color: "#fff !important" }} />}
            label={reward}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600 }}
          />
        </Stack>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            mt: 3, height: 12, borderRadius: 6,
            bgcolor: "rgba(255,255,255,0.25)",
            "& .MuiLinearProgress-bar": { bgcolor: "#fff" },
          }}
        />
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>Today's Tasks</Typography>
      <Stack spacing={2}>
        {tasks.length === 0 && (
          <Card><CardContent>
            <Typography color="text.secondary">No tasks yet — ask a parent to add some!</Typography>
          </CardContent></Card>
        )}
        {tasks.map((t) => (
          <Card
            key={t.id}
            onClick={() => handleToggle(t)}
            sx={{
              cursor: "pointer",
              transition: "all .2s",
              borderColor: t.completed ? "primary.main" : undefined,
              borderWidth: t.completed ? 2 : 1,
              bgcolor: t.completed ? "#EEF4FE" : "background.paper",
              "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: "50%",
                  bgcolor: t.completed ? "primary.main" : "#e3e8f0",
                  color: t.completed ? "#fff" : "text.secondary",
                  display: "grid", placeItems: "center", flexShrink: 0,
                }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ textDecoration: t.completed ? "line-through" : "none" }}>
                    {t.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {t.subject} · {t.minutes} minutes
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button component={Link} to="/dashboard" variant="text">← Back to Parent Dashboard</Button>
      </Box>
    </Container>
  );
}
