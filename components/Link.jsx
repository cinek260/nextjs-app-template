import { Link as RawLink } from "routes";
import { string, node } from "prop-types";

const Link = ({ lng, children, route }) => (
  <RawLink route={`/${lng}${route}`}>{children}</RawLink>
);

Link.propTypes = {
  lng: string.isRequired,
  children: node.isRequired,
  route: string.isRequired
};

export default Link;
