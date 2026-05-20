import { Warp } from "@paper-design/shaders-react"

export default function WarpBackground() {
  return (
    <div className="absolute inset-0">
      <Warp
        colors={["#7c3aed", "#f97316", "#0a0a0f"]}
        scale={2.5}
        rotation={1.35}
        speed={3}
        proportion={0.5}
        softness={1}
        distortion={0.09}
        swirl={0.9}
        swirlIterations={6}
        shapeScale={0.25}
        shape="checks"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
