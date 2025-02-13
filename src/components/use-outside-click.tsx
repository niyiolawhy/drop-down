import { useEffect, useRef, type RefObject } from 'react';

function useOutsideClick(callback: () => void) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        // Add event listener when the hook is mounted
        document?.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document?.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    // Use type assertion here to cast ref to the expected type
    return ref
}

export default useOutsideClick;
