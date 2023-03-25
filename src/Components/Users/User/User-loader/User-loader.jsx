import React from "react"
import ContentLoader from "react-content-loader"

const UserLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={190}
    height={290}
    viewBox="0 0 190 290"
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="169" y="403" rx="0" ry="0" width="260" height="25" /> 
    <rect x="9" y="406" rx="0" ry="0" width="82" height="26" /> 
    <rect x="110" y="394" rx="30" ry="30" width="150" height="45" /> 
    <rect x="384" y="62" rx="0" ry="0" width="35" height="32" /> 
    <rect x="0" y="0" rx="40" ry="40" width="190" height="255" /> 
    <rect x="42" y="79" rx="0" ry="0" width="44" height="39" /> 
    <rect x="41" y="166" rx="0" ry="0" width="56" height="2" /> 
    <rect x="30" y="50" rx="0" ry="0" width="108" height="22" />
  </ContentLoader>
)

export default UserLoader