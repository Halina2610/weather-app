import React from 'react';

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div>
            <h2 style={{ color: 'red' }}>Oops! Something went wrong!</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
                {error.message}
            </details>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};
