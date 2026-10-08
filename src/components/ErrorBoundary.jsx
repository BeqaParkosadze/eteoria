import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_#000]">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border-2 border-slate-900 dark:border-rose-600 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-[2px_2px_0px_#0f172a]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
                დაფიქსირდა შეცდომა
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                გვერდის ჩატვირთვისას მოხდა გაუთვალისწინებელი ხარვეზი.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>გადატვირთვა</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-xs border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Home className="w-4 h-4" />
                <span>მთავარზე დაბრუნება</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
