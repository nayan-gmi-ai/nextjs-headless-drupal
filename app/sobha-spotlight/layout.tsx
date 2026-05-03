import { DraftAlert } from "@/components/misc/DraftAlert"
import SobhaScripts from "./SobhaScripts"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import { Inter, Orbitron } from "next/font/google"

import "@/public/css/swiper-bundle.min.css";
import "@/public/css/aos.css";
import "@/public/css/bootstrap.min.css"
import "@/public/css/spotlight.css"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sobha",
  description: "A sobha spotlight page",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.className}`}>
        <DraftAlert />

        <header>
          <div className="container">
            <div className="row header-row">

              <div className="col-3 logo-main">
                <Image src="/images/logo.svg" width={200} height={50} alt="Head Logo" />
              </div>

              <div className="col-6 header-center">
                <div className="menu-sec">
                  <ul>
                    <li><a href="#aboutus">{"ABOUT"}</a></li>
                    <li><a href="#register">{"register"}</a></li>
                    <li><a href="#playbook">{"playbook"}</a></li>
                    <li><a href="#jury-sec">{"Jury Members"}</a></li>
                  </ul>
                </div>
              </div>


              <div className="col-3 header-right">
                <a href="#register" className="register-bttn"> <span>register now</span> <i><svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                  <path d="M0.75 5L15.3214 5" stroke="#3C3E59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.0715 0.75L15.3215 5L11.0715 9.25" stroke="#3C3E59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg></i> </a>
              </div>

            </div>
          </div>
        </header>

        {children}

        <footer>
          <div className="container">
            <Image src="/images/f-logo.svg" width={200} height={50} alt="Footer Logo" />
          </div>
        </footer>
        <SobhaScripts />
      </body>
    </html>
  )
}
