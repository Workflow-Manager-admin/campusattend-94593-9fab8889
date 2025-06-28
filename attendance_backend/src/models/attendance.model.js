const fs = require('fs');
const path = require('path');

const ATTENDANCE_DB_PATH = path.join(__dirname, '../../data/attendance.json');

// INTERNAL: Utility to read attendance records
function readAttendance() {
  try {
    if (!fs.existsSync(ATTENDANCE_DB_PATH)) return [];
    const data = fs.readFileSync(ATTENDANCE_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// INTERNAL: Write records 
function writeAttendance(records) {
  fs.writeFileSync(ATTENDANCE_DB_PATH, JSON.stringify(records, null, 2), 'utf-8');
}

// PUBLIC_INTERFACE
function getAttendanceByUser(userId) {
  /** Returns all attendance records for a user */
  return readAttendance().filter(a => a.userId === userId);
}

// PUBLIC_INTERFACE
function markAttendance(entry) {
  /** Save attendance mark for user on a date */
  const records = readAttendance();
  records.push(entry);
  writeAttendance(records);
  return entry;
}

// PUBLIC_INTERFACE
function getAttendanceByDate(userId, isoDate) {
  /** Returns true if user has attended on given isoDate */
  return readAttendance().some(a => a.userId === userId && a.date === isoDate);
}

// PUBLIC_INTERFACE
function getAllAttendance() {
  /** Returns ALL attendance records (admin/report) */
  return readAttendance();
}

module.exports = {
  getAttendanceByUser, markAttendance, getAttendanceByDate, getAllAttendance
};
