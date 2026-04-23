import { Container, Typography, Card, CardContent, TextField, MenuItem, Stack, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Chip } from "@mui/material";
import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import { useStore } from "../store";

const gradePoints = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0 };
const gradeOptions = Object.keys(gradePoints);

export default function Transcript() {
  const { state } = useStore();
  const [childId, setChildId] = useState(state.children[0]?.id || "");
  const baseSubjects = state.transcripts[childId] || [];
  const [rows, setRows] = useState(baseSubjects);

  // sync when childId changes
  useMemo(() => {
    setRows(state.transcripts[childId] || []);
  }, [childId, state.transcripts]);

  const updateRow = (i, k, v) => setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)));
  const addRow = () => setRows((r) => [...r, { subject: "New Subject", hours: 0, grade: "A" }]);
  const removeRow = (i) => setRows((r) => r.filter((_, idx) => idx !== i));

  const totals = useMemo(() => {
    const hours = rows.reduce((s, r) => s + Number(r.hours || 0), 0);
    const credits = rows.reduce((s, r) => s + Number(r.hours || 0) / 60, 0);
    const totalPoints = rows.reduce((s, r) => s + (gradePoints[r.grade] || 0) * (Number(r.hours || 0) / 60), 0);
    const gpa = credits > 0 ? totalPoints / credits : 0;
    return { hours, credits: credits.toFixed(1), gpa: gpa.toFixed(2) };
  }, [rows]);

  const child = state.children.find((c) => c.id === childId);

  const exportPdf = () => {
    if (!child) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Official Homeschool Transcript", 20, 22);
    doc.setFontSize(10);
    doc.text("Issued by Homeloop Family Academy", 20, 30);
    doc.line(20, 34, 190, 34);

    doc.setFontSize(11);
    doc.text(`Student: ${child.name}`, 20, 46);
    doc.text(`Age: ${child.age}    Grade: ${child.grade}`, 20, 53);
    doc.text(`Issued: ${new Date().toLocaleDateString()}`, 20, 60);

    let y = 75;
    doc.setFont(undefined, "bold");
    doc.text("Subject", 20, y);
    doc.text("Hours", 110, y);
    doc.text("Credits", 140, y);
    doc.text("Grade", 175, y);
    doc.setFont(undefined, "normal");
    y += 4;
    doc.line(20, y, 190, y);
    y += 8;

    rows.forEach((r) => {
      doc.text(String(r.subject), 20, y);
      doc.text(String(r.hours), 110, y);
      doc.text((Number(r.hours || 0) / 60).toFixed(1), 140, y);
      doc.text(String(r.grade), 175, y);
      y += 8;
    });

    y += 4;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFont(undefined, "bold");
    doc.text(`Total Hours: ${totals.hours}`, 20, y);
    doc.text(`Total Credits: ${totals.credits}`, 80, y);
    doc.text(`GPA: ${totals.gpa}`, 150, y);

    doc.save(`Transcript-${child.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="overline" color="primary">Long-term records</Typography>
      <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>Transcript Generator</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Auto-fill from tracked work, adjust grades, and export a clean PDF transcript.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <TextField select label="Select Child" value={childId} onChange={(e) => setChildId(e.target.value)} sx={{ minWidth: 220 }}>
              {state.children.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </TextField>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1.5}>
              <Chip label={`Hours: ${totals.hours}`} />
              <Chip label={`Credits: ${totals.credits}`} />
              <Chip color="primary" label={`GPA: ${totals.gpa}`} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell width={120}>Hours</TableCell>
                <TableCell width={120}>Grade</TableCell>
                <TableCell width={80} />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <TextField fullWidth size="small" value={r.subject} onChange={(e) => updateRow(i, "subject", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField type="number" size="small" value={r.hours} onChange={(e) => updateRow(i, "hours", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <TextField select size="small" value={r.grade} onChange={(e) => updateRow(i, "grade", e.target.value)}>
                      {gradeOptions.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Button size="small" color="inherit" onClick={() => removeRow(i)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={addRow}>+ Add Subject</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" onClick={exportPdf}>Export Transcript PDF</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
