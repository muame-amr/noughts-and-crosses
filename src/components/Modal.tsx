import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg p-6">
				<div className="flex justify-end">
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={onClose}
					>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M14.35 7.64a.5.5 0 010 .71L11.07 11l3.28 3.65a.5.5 0 11-.71.71L10.36 11 7.07 14.29a.5.5 0 01-.71-.71L9.65 11 6.36 7.64a.5.5 0 01.71-.71L10 10.29l3.29-3.64a.5.5 0 01.71 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
