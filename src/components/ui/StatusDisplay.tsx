import { AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  sub?: string;
}

export function EmptyState({ message, sub }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Info className="w-10 h-10 text-navy-300 mb-3" />
      <p className="text-navy-500 font-medium">{message}</p>
      {sub && <p className="text-sm text-navy-400 mt-1 max-w-xs">{sub}</p>}
    </div>
  );
}

export function InsufficientData({ reason }: { reason: string }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-gold-50 border border-gold-200">
      <AlertTriangle className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
      <p className="text-sm text-gold-800">
        <span className="font-medium">Insufficient comparable supply data</span>
        {reason ? ` — ${reason}` : ''}
      </p>
    </div>
  );
}

export function StatusIcon({ status }: { status: 'valid' | 'warnings' | 'errors' }) {
  if (status === 'valid') return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
  if (status === 'warnings') return <AlertTriangle className="w-4 h-4 text-gold-500" />;
  return <XCircle className="w-4 h-4 text-red-500" />;
}
