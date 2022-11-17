import React from "react";
import NextLink from "next/link";

export default function Link({ href, children }) {
    return (
        <NextLink href={href} passHref style={{ textDecoration: "none" }}>
            {children}
        </NextLink>
    );   
}