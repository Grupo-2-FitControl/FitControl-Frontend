import { useEffect } from "react";

const ICONS = {
    success: "✔",
    error: "✖",
};

const COLORS = {
    success: "bg-green-500/10 border-green-500 text-green-400",
    error: "bg-red-500/10 border-red-500 text-red-400",
};

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        if (!onClose) return;
        
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slideIn">
            <div
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg backdrop-blur-md ${COLORS[type]}`}
            >
                <span className="text-lg">{ICONS[type]}</span>

                <p className="text-sm font-medium">{message}</p>

                <button
                    onClick={onClose}
                    className="ml-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;