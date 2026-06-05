import { styled } from "@mui/material";
import React from "react";
import {
    enteWordmarkDotData,
    enteWordmarkPaths,
    enteWordmarkRectData,
    enteWordmarkViewBox,
} from "./ente-wordmark";

interface EnteLogoProps {
    /**
     * The height of the logo image, in pixels.
     *
     * Default: 18px
     */
    height?: number;
}

export const EnteLogo: React.FC<EnteLogoProps> = ({ height }) => (
    <svg
        height={height ?? 18}
        viewBox={enteWordmarkViewBox}
        xmlns="http://www.w3.org/2000/svg"
    >
        {enteWordmarkPaths.map((d, index) => (
            <path key={index} d={d} fill="currentColor" />
        ))}
        <rect
            x={enteWordmarkRectData.x}
            y={enteWordmarkRectData.y}
            width={enteWordmarkRectData.width}
            height={enteWordmarkRectData.height}
            fill="currentColor"
        />
        <circle
            cx={enteWordmarkDotData.cx}
            cy={enteWordmarkDotData.cy}
            r={enteWordmarkDotData.r}
            fill={enteWordmarkDotData.fill}
        />
    </svg>
);

export const EnteLogoBox = styled("div")`
    line-height: 0;
`;
