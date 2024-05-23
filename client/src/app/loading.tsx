import { cn } from "@/lib/utils";
export default function Loading() {
	return (
		<div className="flex flex-col gap-3 items-center justify-center content-center text-center h-screen">
			<h1 className="font-bold text-3xl">Roxiler</h1>
			<LoadingSpinner className="h-10 w-10" />
		</div>
	);
}

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const LoadingSpinner = ({ size = 24, className, ...props }: ISVGProps) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("animate-spin", className)}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
};
