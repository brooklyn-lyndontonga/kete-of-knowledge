import React, { Suspense } from "react"
const ProfileStack = React.lazy(() => import("./ProfileStack"))
export default function ProfileStackLazy() {
  return <Suspense fallback={null}><ProfileStack/></Suspense>
}
