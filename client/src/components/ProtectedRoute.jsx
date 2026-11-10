
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();

  return isAuthed
    ? children
    : <Navigate to="/admin/login" replace />;
}
