import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-commerce Demo with AppsFlyer',
  description: 'Next.js e-commerce demo integrated with AppsFlyer Web SDK',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="af-web-sdk"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a;t.AF=t.AF||function(){
(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))};
t.AF.id=t.AF.id||i;t.AF.plugins={};
o=e.createElement(n);p=e.getElementsByTagName(n)[0];o.async=1;
o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:"");
p.parentNode.insertBefore(o,p);
}(window,document,"script",0,"AF","pba",
{pba:{webAppId:"${process.env.NEXT_PUBLIC_AF_WEB_DEV_KEY || 'YOUR_WEB_DEV_KEY_HERE'}",measurementStatus:true}});
console.log('AppsFlyer SDK initialized with key:', "${process.env.NEXT_PUBLIC_AF_WEB_DEV_KEY || 'YOUR_WEB_DEV_KEY_HERE'}");
`}}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
