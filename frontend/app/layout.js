import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

export const metadata = {
  title: "Todo App",
  description: "A simple todo app with GraphQL and dark mode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
