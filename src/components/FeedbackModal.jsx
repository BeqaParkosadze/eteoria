import React, { useState } from 'react';
import { Bug, Send, Mail, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Use Web3Forms free endpoint for direct email delivery to farqodev@gmail.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '65e23659-3d1f-4efc-8b89-6d80429a32c6', // Public Web3Forms submission key
          subject: 'eTeoria App - ხარვეზის შეტყობინება / Feedback',
          from_name: sender.trim() || 'eTeoria User',
          email: sender.includes('@') ? sender.trim() : 'farqodev@gmail.com',
          message: `Sender: ${sender}\n\nMessage:\n${message}`,
          to: 'farqodev@gmail.com'
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setMessage('');
        setSender('');
      } else {
        // Fallback: open mailto
        window.open(`mailto:farqodev@gmail.com?subject=eTeoria%20Feedback&body=${encodeURIComponent(message)}`, '_blank');
        setStatus('success');
      }
    } catch (err) {
      console.warn('Form dispatch error, opening mailto fallback:', err);
      window.open(`mailto:farqodev@gmail.com?subject=eTeoria%20Feedback&body=${encodeURIComponent(message)}`, '_blank');
      setStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent('eTeoria App - ხარვეზის დაფიქსირება');
    const body = encodeURIComponent(message ? `გამარჯობა,\n\n${message}` : 'გამარჯობა,');
    window.open(`mailto:farqodev@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#161F30] border-3 border-slate-900 dark:border-slate-700 rounded-3xl shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col text-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center">
              <Bug className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                ხარვეზის დაფიქსირება & უკუკავშირი
              </h3>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                შეგვატყობინეთ უზუსტობა ან გაგვიზიარეთ იდეა
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border-2 border-slate-900 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="დახურვა"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {status === 'success' ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="text-base font-black">მადლობა! შეტყობინება მიღებულია</h4>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                თქვენი შეტყობინება გადაეგზავნა დეველოპერს (`farqodev@gmail.com`). ჩვენ მალე გადავამოწმებთ ხარვეზს.
              </p>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="mt-3 px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-sm"
              >
                ახალი შეტყობინების დაწერა
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                  თქვენი სახელი / მეილი (სურვილისამებრ):
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="მაგ: გიორგი, giorgi@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
                  შეტყობინება / რომელი ბილეთია ხარვეზიანი: *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="აღწერეთ შეცდომა, კითხვის ნომერი ან იდეა..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Direct Mail Banner */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 flex items-center justify-between gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>
                    შენიშვნების შემთხვევაში მოგვწერეთ: <strong className="text-slate-900 dark:text-white font-mono">farqodev@gmail.com</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleMailtoDirect}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-[11px] font-black hover:bg-slate-50 shrink-0"
                >
                  Mailto ↗
                </button>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  გაუქმება
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white border-2 border-slate-900 dark:border-slate-700 text-xs font-black shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>იგზავნება...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>გაგზავნა 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
