import type { FC } from "react";

const LoadingSpinner: FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <div className="w-14 h-14 border-5 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

export default LoadingSpinner;