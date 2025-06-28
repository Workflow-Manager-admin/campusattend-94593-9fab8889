/**
 * Notification service: triggers for low attendance.
 * For demo: provides advisory when a user's attendance drops below a threshold.
 */

// PUBLIC_INTERFACE
function checkLowAttendance(records, thresholdPercent = 75) {
  /**
   * If attendance percentage is below a threshold, return a notification object.
   */
  const now = new Date();
  const day = now.getDate();
  if (day === 0) return null;
  const actual = records.length;
  const percent = Math.round(100 * actual / day);
  if (percent < thresholdPercent) {
    return {
      type: 'attendance_alert',
      message: `Your attendance is ${percent}%. This is below the required ${thresholdPercent}%.`,
      current: percent
    };
  }
  return null;
}

module.exports = { checkLowAttendance };
