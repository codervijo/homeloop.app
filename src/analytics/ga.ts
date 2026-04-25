/**
 * GA4 event helper — pushes to window.dataLayer so events are queued
 * even if the gtag script hasn't finished loading yet.
 * In dev mode, events are logged to the console only (no network calls).
 */

function pushEvent(eventName: string, params: Record<string, string>): void {
  if (import.meta.env.DEV) {
    console.log(`[GA] ${eventName}`, params);
    return;
  }
  const win = window as unknown as { dataLayer?: unknown[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push(['event', eventName, params]);
}

export function trackTaskAdded(subject: string): void {
  pushEvent('task_added', { subject });
}

export function trackTaskCompleted(subject: string, childId: string): void {
  pushEvent('task_completed', { subject, child_id: childId });
}

export function trackTranscriptExported(childId: string): void {
  pushEvent('transcript_exported', { child_id: childId });
}

export function trackComplianceViewed(): void {
  pushEvent('compliance_viewed', { page_path: window.location.pathname });
}

export function trackChildViewed(childId: string): void {
  pushEvent('child_viewed', { child_id: childId, page_path: window.location.pathname });
}
