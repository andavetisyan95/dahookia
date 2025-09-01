import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import { socialIcons } from "../../../../source/socials";

export default function SocialIcons() {
  return (
    <Box sx={{ display: 'flex', gap: '27.6px' }} className="center">
      {socialIcons.map(({ id, imgName, imgPath, url }) => (
        <Box key={id}>
          <Link href={url} passHref>
            <Image
              src={imgPath}
              alt={imgName}
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Box>
      ))}
    </Box>
  );
}
