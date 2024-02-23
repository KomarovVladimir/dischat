import {
    ListItemProps,
    ListItem as MuiListItem,
    TextField,
    styled
} from "@mui/material";

//TODO: Create common components
export const ListItem = styled(MuiListItem)<
    ListItemProps & { disabled?: boolean }
>(({ theme, disabled }) => ({
    borderRadius: ".5rem",
    marginBottom: "1rem",
    border: " 1px solid #383c47",
    background: "rgba(203, 227, 255, 0.10)",
    boxShadow: "8px 16px 24px 0px rgba(0, 0, 0, 0.16)",
    backdropFilter: "blur(8px)",
    cursor: disabled ? "default" : "pointer",

    "&:hover": {
        textDecoration: "none",
        backgroundColor: theme.palette.action.hover,
        "@media (hover: none)": {
            backgroundColor: "transparent"
        }
    }
}));

export const Input = styled(TextField)(({ theme }) => ({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    height: "3rem",
    borderRadius: ".5rem",
    mb: "1rem",
    border: " 1px solid #383c47",
    background: "rgba(0, 0, 0, 0.20)",

    ".MuiInput-root": {
        transition: theme.transitions.create(
            ["background-color", "transform"],
            {
                duration: theme.transitions.duration.short
            }
        )
    },

    "& .Mui-focused": {
        background: "rgba(203, 227, 255, 0.10)",
        boxShadow: "8px 16px 24px 0px rgba(0, 0, 0, 0.16)",
        backdropFilter: "blur(8px)"
    }
}));
