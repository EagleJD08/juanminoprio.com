CREATE TABLE IF NOT EXISTS quiz_results (
  id TEXT PRIMARY KEY,
  result_type TEXT NOT NULL,
  scores TEXT NOT NULL,
  answers TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX idx_quiz_results_result_type ON quiz_results(result_type);
