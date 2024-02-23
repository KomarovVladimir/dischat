import { Typography, TypographyProps, styled } from "@mui/material";
import { ElementType } from "react";
import { LinkProps } from "react-router-dom";

export const Title = styled(Typography)({
    textDecoration: "none",
    boxShadow: "none",
    fontSize: "2rem",
    color: "white"
});

export const TitleLink = styled(Title)<
    TypographyProps & { component: ElementType } & LinkProps
>(({ theme }) => ({
    "&:hover": {
        color: theme.palette.primary.main
    }
}));
