import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from "react";

function PagnigationOptions({ pagnigation, pagnigationDispatch }) {
	const prevPagnigationBtn = useRef(null);
	const nextPagnigationBtn = useRef(null);

	const validatePagnigation = (action) => {
		const isNext = action === "NEXT_PAGE";
		const isPrev = action === "PREV_PAGE";
		const isLastPage = pagnigation.page === pagnigation.maxPage;
		const isFirstPage = pagnigation.page === 1;

		if ((isNext && isLastPage) || (isPrev && isFirstPage)) {
			if (isNext) nextPagnigationBtn.current.disabled = true;
			if (isPrev) prevPagnigationBtn.current.disabled = true;
			return false;
		}
		return true;
	};

	const setProcessBtnClass = (page) => {
		const processBtns = document?.querySelector(".statistics-pagnigation__process button.active");
		processBtns?.classList.remove("active");
		document?.getElementById(`statistics-pagnigation__process-id-${page}`)?.classList.add("active");
	};

	const handleNextPage = () => {
		prevPagnigationBtn.current.disabled = false;
		pagnigationDispatch({ type: "NEXT_PAGE" });
	};

	const handlePrevPage = () => {
		nextPagnigationBtn.current.disabled = false;
		pagnigationDispatch({ type: "PREV_PAGE" });
	};

	const handleSetPage = (page) => {
		if (page >= 1 && page <= pagnigation.maxPage) {
			pagnigationDispatch({ type: "SET_PAGE", payload: page });
			prevPagnigationBtn.current.disabled = page === 1;
			nextPagnigationBtn.current.disabled = page === pagnigation.maxPage;
		}
	};

	useEffect(() => {
		validatePagnigation("PREV_PAGE");
		validatePagnigation("NEXT_PAGE");
        setProcessBtnClass(pagnigation.page);
	}, [pagnigation.page, pagnigation.maxPage]);

	return (
		<ul className="statistics-pagnigation">
			<button className="statistics-pagnigation__btn" onClick={handlePrevPage} ref={prevPagnigationBtn}>
				<FontAwesomeIcon icon={faCaretLeft} /> Trang trước
			</button>
			<div className="statistics-pagnigation__process">
				{Array.from({ length: pagnigation?.maxPage }).map((_, index) => (
					<button
						key={index}
						id={`statistics-pagnigation__process-id-${index + 1}`}
						onClick={() => handleSetPage(index + 1)}
					>
						<span>{index + 1}</span>
					</button>
				))}
			</div>
			<button className="statistics-pagnigation__btn" onClick={handleNextPage} ref={nextPagnigationBtn}>
				Trang sau <FontAwesomeIcon icon={faCaretRight} />
			</button>
		</ul>
	);
}

export default PagnigationOptions;
