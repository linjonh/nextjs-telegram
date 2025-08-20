// Loading animation
const shimmer =
    'before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
export function QrcodeImgSkeleton() {
    return (
        <div
            className={`${shimmer} h-[200px] w-[200px] rounded-xl bg-gray-200 p-2 shadow-sm m-10`}
        >
            <div className="flex items-center justify-center h-full">
                <div className="h-10 w-10 rounded-md bg-gray-100" />
            </div>
        </div>
    );
}