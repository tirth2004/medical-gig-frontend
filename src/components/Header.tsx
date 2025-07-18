import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Header() {
  return (
    <header className="w-full bg-[#ECEFEC] flex items-center justify-between px-4 sm:px-8 py-3">
      <Button
        variant="contained"
        color="inherit"
        className="!bg-white !text-black !rounded-full !font-semibold"
        disableElevation
      >
        Apply Now
      </Button>
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <IconButton color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit">
          <WhatsAppIcon />
        </IconButton>
        <IconButton color="inherit">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit">
          <YouTubeIcon />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
