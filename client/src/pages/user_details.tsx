import {
	Person,
	Phone,
	Email,
	Verified,
	Abc,
	School,
} from "@mui/icons-material";

import { Typography } from "@pankod/refine-antd";
import { Link } from "@pankod/refine-mui";
import { IUser } from "../interfaces/all";

const { Text } = Typography;

interface Props {
	user: IUser;
	style: React.CSSProperties | null;
};

export const UserDetails: React.FC<Props> = ({ user, style = null }) => {
	return <div style={{ ...style, width: "100%", border: "1px solid grey", borderRadius: "20px", padding: "0.5cm 0.5cm 0.5cm 0.5cm" }}>
		<Person style={{ width: "75px", height: "75px" }} />
		<br />

		<Text style={{ fontSize: "25px" }}>
			{user.name}
		</Text>
		<br />

		<Text strong={true} style={{ fontSize: "15px" }}>
			<Abc style={{ height: "15px" }} />
			{user.aura_id}
		</Text>
		<br />

		<Text strong={true} style={{ fontSize: "15px" }}>
			<Phone style={{ height: "15px" }} />
			{`${user.phone}`}
		</Text>
		<br />

		<div>
			<Email style={{ height: "15px" }} />
			<Link href={`mailto:${user.email}`} style={{ fontSize: "15px" }}>
				{user.email}
				{user.email_verified && <Verified style={{ height: "15px" }} />}
			</Link>
		</div>

		<Text strong={true} style={{ fontSize: "15px" }}>
			<School style={{ height: "15px" }} />
			{`${user.college}`}
		</Text>
		<br />
		<Text strong={true} style={{ fontSize: "15px" }}>
			<School style={{ height: "15px", visibility: "hidden" }} />
			{`USN: ${user.usn}`}
		</Text>
		<br />
		<Text>This user is participating for {user.paid_for.length} {"event(s)"} as a team leader.</Text>
	</div>;
};
