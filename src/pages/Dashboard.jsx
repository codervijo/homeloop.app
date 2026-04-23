import { Container, Typography, Grid, Card, CardContent, Button, Stack, Box, LinearProgress, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip, Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";

export default function Dashboard() {
  const { state, addTask, toggleTask, removeTask } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", childId: state.children[0]?.id || "", subject: "Math", minutes: 30 });

  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = state.tasks.filter((t) => t.date === today);

  const stats = useMemo(() => {
    return state.children.map((c) => {
      const ts = todayTasks.filter((t) => t.childId === c.id);
      const done = ts.filter((t) => t.completed).length;
      return { child: c, total: ts.length, done, pct: ts.length ? (done / ts.length) * 100 : 0 };
    });
  }, [state.children, todayTasks]);

  const week = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0, 10);
      const dayTasks = state.tasks.filter((t) => t.date === ds);
      const done = dayTasks.filter((t) => t.completed).length;
      const pct = dayTasks.length ? done / dayTasks.length : 0;
      days.push({ label: d.toLocaleDateString(undefined, { weekday: "short" }), pct, done, total: dayTasks.length });
    }
    return days;
  }, [state.tasks]);

  const handleAdd = () => {
    if (!form.title.trim() || !form.childId) return;
    addTask({ ...form, minutes: Number(form.minutes) || 30 });
    setForm({ title: "", childId: state.children[0]?.id || "", subject: "Math", minutes: 30 });
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} sx={{ mb: 4 }} spacing={2}>
        <Box>
          <Typography variant="overline" color="primary">Parent dashboard</Typography>
          <Typography variant="h4">Hi, {state.parent.name.split(" ")[0]} 👋</Typography>
          <Typography color="text.secondary">Here's what your homeschool looks like today.</Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)}>+ Add Task</Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Today's Tasks</Typography>
              {todayTasks.length === 0 && (
                <Typography color="text.secondary">No tasks yet for today. Add one to get started.</Typography>
              )}
              <Stack spacing={1}>
                {todayTasks.map((t) => {
                  const child = state.children.find((c) => c.id === t.childId);
                  return (
                    <Stack key={t.id} direction="row" alignItems="center" spacing={1.5} sx={{ p: 1.5, border: "1px solid #eef1f6", borderRadius: 2 }}>
                      <IconButton onClick={() => toggleTask(t.id)} size="small">
                        {t.completed ? <CheckCircleRoundedIcon color="primary" /> : <RadioButtonUncheckedIcon />}
                      </IconButton>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ textDecoration: t.completed ? "line-through" : "none", color: t.completed ? "text.secondary" : "text.primary" }}>
                          {t.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Chip size="small" label={child?.name || "—"} />
                          <Chip size="small" label={t.subject} variant="outlined" />
                          <Chip size="small" label={`${t.minutes}m`} variant="outlined" />
                        </Stack>
                      </Box>
                      <IconButton onClick={() => removeTask(t.id)} size="small"><DeleteOutlineIcon fontSize="small" /></IconButton>
                    </Stack>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Children</Typography>
                <Stack spacing={2}>
                  {stats.map(({ child, done, total, pct }) => (
                    <Box key={child.id}>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>{child.name[0]}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>{child.name}</Typography>
                          <Typography variant="caption" color="text.secondary">Age {child.age} · Grade {child.grade}</Typography>
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <LocalFireDepartmentRoundedIcon sx={{ color: "#ff7a45", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{state.streaks[child.id] || 0}</Typography>
                        </Stack>
                        <Button component={Link} to={`/child/${child.id}`} size="small" variant="outlined">Open</Button>
                      </Stack>
                      <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="caption" color="text.secondary">{done} / {total} done today</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Weekly Consistency</Typography>
                <Stack direction="row" alignItems="flex-end" spacing={1} sx={{ height: 120 }}>
                  {week.map((d, i) => (
                    <Stack key={i} alignItems="center" sx={{ flex: 1 }} spacing={0.5}>
                      <Box sx={{
                        width: "100%",
                        height: `${Math.max(8, d.pct * 100)}%`,
                        bgcolor: d.pct > 0 ? "primary.main" : "#e3e8f0",
                        borderRadius: 1,
                        transition: "height .3s",
                      }} />
                      <Typography variant="caption" color="text.secondary">{d.label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField select label="Child" required value={form.childId} onChange={(e) => setForm({ ...form, childId: e.target.value })}>
              {state.children.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </TextField>
            <TextField select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {["Math", "English", "Science", "History", "Art", "PE", "General"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField type="number" label="Minutes" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
