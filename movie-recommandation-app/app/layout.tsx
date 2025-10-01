import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Movie Recommendation App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}