import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// --- Theme Customization Variables ---
const THEME_BACKGROUND = "#121633"; // Dark Navy from your login page background
const THEME_TEXT_COLOR = "#ffffff";
const THEME_ACCENT_COLOR = "#6e80e5"; // A blue/purple shade from the 'LOG IN' button
const THEME_ERROR_COLOR = "#d63031"; // A standard red for errors
const TOOLTIP_ERROR_COLOR = "#ff8c00";

// --- Custom Classes for a more tailored look ---
const CUSTOM_CLASSES = {
    popup: "movie-swal-popup", // Add a custom class for potential border/shadow
    confirmButton: "movie-swal-confirm-button"
};

// 🎉 SUCCESS - Movie Ticket Booked!
export const showSuccess = (message, title = "Success! 🍿 Ticket Confirmed") => {
    MySwal.fire({
        title: title,
        text: message,
        icon: "success",
        iconColor: "#28a745", // Standard green for success
        confirmButtonColor: THEME_ACCENT_COLOR,
        background: THEME_BACKGROUND,
        color: THEME_TEXT_COLOR,
        customClass: CUSTOM_CLASSES,
    });
};

export const showError = (message, title = "Error 🛑 Action Failed") => {
    MySwal.fire({
        title: title,
        text: message,
        icon: "error",
        iconColor: THEME_ERROR_COLOR,
        confirmButtonColor: THEME_ACCENT_COLOR,
        background: THEME_BACKGROUND,
        color: THEME_TEXT_COLOR,
        customClass: CUSTOM_CLASSES,
    });
};


export const showWarning = (message, title = "Wait! 💡 Just a Heads-Up") => {
    MySwal.fire({
        title: title,
        text: message,
        icon: "warning",
        iconColor: "#ffc107", // Standard yellow for warning
        confirmButtonColor: THEME_ACCENT_COLOR,
        background: THEME_BACKGROUND,
        color: THEME_TEXT_COLOR,
        customClass: CUSTOM_CLASSES,
    });
};


export const showInfo = (message, title = "Info 🎟️ Details") => {
    MySwal.fire({
        title: title,
        text: message,
        icon: "info",
        iconColor: "#17a2b8", // Standard blue for info
        confirmButtonColor: THEME_ACCENT_COLOR,
        background: THEME_BACKGROUND,
        color: THEME_TEXT_COLOR,
        customClass: CUSTOM_CLASSES,
    });
};


export const showServerError = (message = "Internal Server Error. Please try again.") => {
    Swal.fire({
        title: "Server Down! 🚨 No Show",
        text: message,
        icon: "error",
        confirmButtonText: "Retry Booking",
        confirmButtonColor: THEME_ACCENT_COLOR,
        background: THEME_BACKGROUND,
        color: THEME_TEXT_COLOR,
        iconColor: THEME_ERROR_COLOR,
        width: "400px",
        customClass: CUSTOM_CLASSES
    });
};

// 7. 🟠 NEW: Input Field Tooltip Error (White Popover)
export const showInputTooltipError = (message) => {
    Swal.fire({
        // Toast settings
        toast: true,
        position: 'top', // Adjust position via custom CSS margin-top
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        // Content & Styling
        title: "",
        text: message,
        icon: "warning",
        iconColor: TOOLTIP_ERROR_COLOR,
        background: THEME_TEXT_COLOR, // White background
        color: THEME_BACKGROUND, // Dark text
        width: "auto",

        customClass: {
            // Unique class for the white tooltip look
            popup: "movie-tooltip-popup",
            icon: "movie-tooltip-icon",
            htmlContainer: "movie-tooltip-text"
        },
    });
};

