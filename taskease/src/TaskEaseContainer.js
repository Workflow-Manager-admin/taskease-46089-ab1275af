import React, { useState, useRef } from 'react';

/**
 * TaskEaseContainer - The main container of TaskEase, a modern, minimal To-Do list app.
 * Features:
 *   - Add, edit, delete, mark-complete, and clear-completed tasks.
 *   - Modern light theme using: primary #1976D2, accent #43A047, secondary #FFFFFF.
 *   - Clean, centered UI with a top input; completed tasks are struck/faded.
 * Styling is done inline for brevity & self-containment. Should ideally be extracted to CSS.
 */
// PUBLIC_INTERFACE
function TaskEaseContainer() {
  // Each task: { id, text, completed }
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef();

  // --- Handlers ---

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleAddTask(e) {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setTasks((tasks) => [
      ...tasks,
      { id: Date.now(), text: val, completed: false }
    ]);
    setInputValue('');
    inputRef.current && inputRef.current.focus();
  }

  // PUBLIC_INTERFACE
  function handleEditTask(id, text) {
    setEditingId(id);
    setEditValue(text);
  }

  // PUBLIC_INTERFACE
  function handleEditInputChange(e) {
    setEditValue(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleEditSave(id) {
    const newText = editValue.trim();
    if (!newText) return;
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingId(null);
    setEditValue('');
  }

  // PUBLIC_INTERFACE
  function handleEditCancel() {
    setEditingId(null);
    setEditValue('');
  }

  // PUBLIC_INTERFACE
  function handleDeleteTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  // PUBLIC_INTERFACE
  function handleToggleComplete(id) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // PUBLIC_INTERFACE
  function handleClearCompleted() {
    setTasks(tasks => tasks.filter(task => !task.completed));
  }

  const theme = {
    '--primary': '#1976D2',
    '--accent': '#43A047',
    '--secondary': '#FFFFFF',
    '--completed-bg': '#E3F2FD',
    '--completed-text': '#90A4AE',
    '--input-border': '#B0BEC5',
    '--input-focus': '#1976D2',
    '--item-hover': '#F5F5F5',
    '--shadow': '0 4px 16px rgba(25, 118, 210, 0.08)'
  };

  // --- Render ---

  return (
    <div style={{
      background: 'var(--secondary)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      fontFamily: `'Inter','Roboto','Helvetica','Arial',sans-serif`,
      color: '#222',
      paddingTop: 40
    }}>
      <style>
        {`
        .tease-main-container {
          background: #fff;
          padding: 32px 24px 24px 24px;
          margin-top: 60px;
          border-radius: 12px;
          box-shadow: var(--shadow);
          min-width: 350px;
          max-width: 420px;
          width: 98vw;
        }
        .tease-title {
          color: var(--primary);
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0 0 16px 0;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .tease-add-form {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tease-input {
          flex: 1;
          padding: 10px 12px;
          border-radius: 6px;
          border: 1.5px solid var(--input-border);
          font-size: 1rem;
          outline: none;
          background: #fafbfc;
          transition: border 0.16s;
        }
        .tease-input:focus {
          border: 1.5px solid var(--input-focus);
        }
        .tease-add-btn {
          background: var(--primary);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0 20px;
          font-size: 1.09rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }
        .tease-add-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .tease-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tease-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #ececec;
          transition: background 0.13s;
        }
        .tease-item:last-child {
          border-bottom: none;
        }
        .tease-item:hover {
          background: var(--item-hover);
        }
        .tease-checkbox {
          accent-color: var(--accent);
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .tease-task-text {
          flex: 1;
          font-size: 1.06rem;
          word-break: break-word;
        }
        .tease-task-text.completed {
          text-decoration: line-through;
          color: var(--completed-text);
          background: var(--completed-bg);
          opacity: 0.7;
        }
        .tease-edit-input {
          flex: 1;
          padding: 7px 10px;
          border-radius: 5px;
          border: 1.2px solid var(--input-border);
          font-size: 1rem;
        }
        .tease-action-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          padding: 5px 8px;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          outline: none;
          margin-left: 2px;
          transition: background 0.14s;
        }
        .tease-action-btn:active {
          background: #e3f2fd;
        }
        .tease-action-btn.delete {
          color: #b71c1c;
        }
        .tease-action-btn.save {
          color: var(--accent);
          font-weight: 600;
        }
        .tease-action-btn.cancel {
          color: #888;
        }
        .tease-footer {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.99rem;
          color: #666;
        }
        .tease-clear-btn {
          background: var(--accent);
          color: #fff;
          border: none;
          padding: 7px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.16s;
        }
        .tease-clear-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 520px) {
          .tease-main-container {
            margin-top: 16px;
            min-width: unset;
            max-width: 98vw;
            padding: 20px 5vw;
          }
        }
        `}
      </style>
      <div className="tease-main-container" style={theme}>
        <h2 className="tease-title">TaskEase</h2>
        <form className="tease-add-form" onSubmit={handleAddTask} autoComplete="off">
          <input
            className="tease-input"
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
            maxLength={60}
            aria-label="Task description"
          />
          <button className="tease-add-btn" type="submit" disabled={!inputValue.trim()}>Add</button>
        </form>
        <ul className="tease-list">
          {tasks.length === 0 && (
            <li style={{ textAlign: 'center', color: '#b0b0b0', padding: '32px 0 12px 0', fontSize: '1.06rem' }}>
              No tasks yet. Add a task to get started!
            </li>
          )}
          {tasks.map(task =>
            <li key={task.id} className="tease-item">
              <input
                className="tease-checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              />
              {editingId === task.id ? (
                <>
                  <input
                    className="tease-edit-input"
                    type="text"
                    value={editValue}
                    onChange={handleEditInputChange}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleEditSave(task.id);
                      if (e.key === 'Escape') handleEditCancel();
                    }}
                    maxLength={60}
                    autoFocus
                  />
                  <button className="tease-action-btn save" onClick={() => handleEditSave(task.id)} type="button" aria-label="Save">Save</button>
                  <button className="tease-action-btn cancel" onClick={handleEditCancel} type="button" aria-label="Cancel">Cancel</button>
                </>
              ) : (
                <>
                  <span
                    className={`tease-task-text${task.completed ? ' completed' : ''}`}
                    onDoubleClick={() => handleEditTask(task.id, task.text)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleEditTask(task.id, task.text); }}
                    aria-label={task.completed ? `Completed: ${task.text}` : `Task: ${task.text}`}
                  >
                    {task.text}
                  </span>
                  <button className="tease-action-btn" onClick={() => handleEditTask(task.id, task.text)} aria-label="Edit" title="Edit task">
                    ✏️
                  </button>
                  <button className="tease-action-btn delete" onClick={() => handleDeleteTask(task.id)} aria-label="Delete" title="Delete task">
                    🗑
                  </button>
                </>
              )}
            </li>
          )}
        </ul>
        <div className="tease-footer" style={{ marginTop: '8px' }}>
          <span>{tasks.filter(t => !t.completed).length} left • {tasks.filter(t => t.completed).length} completed</span>
          <button
            className="tease-clear-btn"
            type="button"
            onClick={handleClearCompleted}
            style={{
              display: tasks.some(t => t.completed) ? undefined : 'none'
            }}
            disabled={!tasks.some(t => t.completed)}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskEaseContainer;
