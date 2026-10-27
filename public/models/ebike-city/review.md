# Review — Autonomy E-City

Input: source\ebike-city\scene.glb  ·  53 pieces  ·  53380 faces  ·  L 1.83 m, H 1.082 m, body W 0.668 m

Cột: id · part · key · side/end · kích thước (m) · tâm (m) · mặt · lưới nguồn · vật liệu. Sửa nhãn sai bằng `pipeline.hints` trong model.json (match = regex trên "vật liệu tên-lưới tên-node").

| id | part | key | mod | size | center | faces | source | material |
|---|---|---|---|---|---|---|---|---|
| battery_0015 | battery | battery.case |  | 0.26×0.28×0.09 | -0.15, 0.58, 0.00 | 972 | battery.case | battery casing |
| battery_0051 | battery | battery.cells |  | 0.20×0.23×0.06 | -0.15, 0.58, 0.00 | 1856 | battery.cells | cell wrap |
| battery_0050 | battery | battery.cells |  | 0.02×0.02×0.06 | -0.25, 0.68, 0.00 | 64 | battery.cells | cell wrap |
| body_0011 | body | fender | F | 0.70×0.30×0.07 | -0.56, 0.55, 0.00 | 128 | fender.front | paint green fender |
| body_0012 | body | fender | R | 0.52×0.55×0.07 | 0.66, 0.43, 0.00 | 128 | fender.rear | paint green fender |
| body_0033 | body | fork.crown |  | 0.06×0.04×0.13 | -0.47, 0.69, 0.00 | 588 | fork.crown | paint green |
| body_0013 | body | fork.leg | L | 0.13×0.36×0.03 | -0.52, 0.51, 0.05 | 1344 | fork.leg L | paint green |
| body_0014 | body | fork.leg | R | 0.13×0.36×0.03 | -0.52, 0.51, -0.05 | 1344 | fork.leg R | paint green |
| body_0048 | body | frame.bb |  | 0.05×0.05×0.08 | 0.05, 0.30, 0.00 | 256 | frame.bb | paint green |
| body_0004 | body | frame.down |  | 0.52×0.51×0.06 | -0.20, 0.53, 0.00 | 2688 | frame.down | paint green |
| body_0034 | body | frame.head |  | 0.10×0.17×0.05 | -0.43, 0.79, 0.00 | 80 | frame.head | paint green |
| body_0021 | body | frame.seat |  | 0.17×0.44×0.04 | 0.12, 0.51, 0.00 | 80 | frame.seat | paint green |
| body_0024 | body | kickstand |  | 0.07×0.28×0.16 | 0.14, 0.16, 0.12 | 80 | kickstand | black plastic |
| body_0049 | body | light.front |  | 0.06×0.07×0.07 | -0.48, 0.80, 0.00 | 128 | light.front | lamp white |
| body_0042 | body | light.rear |  | 0.03×0.04×0.09 | 0.68, 0.77, 0.00 | 588 | light.rear | lamp red |
| body_0006 | body | rack |  | 0.44×0.45×0.17 | 0.45, 0.57, 0.00 | 4400 | rack | black plastic |
| body_0019 | body | stay.chain | L | 0.48×0.06×0.07 | 0.31, 0.32, 0.04 | 80 | stay.chain L | paint green |
| body_0020 | body | stay.chain | R | 0.48×0.06×0.07 | 0.31, 0.32, -0.04 | 80 | stay.chain R | paint green |
| body_0017 | body | stay.seat | L | 0.39×0.34×0.07 | 0.36, 0.51, 0.04 | 80 | stay.seat L | paint green |
| body_0018 | body | stay.seat | R | 0.39×0.34×0.07 | 0.36, 0.51, -0.04 | 80 | stay.seat R | paint green |
| brakes_0046 | brakes | caliper | R | 0.04×0.06×0.02 | 0.47, 0.36, 0.09 | 588 | brake.caliper R | black plastic |
| brakes_0047 | brakes | caliper | F | 0.04×0.06×0.02 | -0.50, 0.31, 0.09 | 588 | brake.caliper F | black plastic |
| brakes_0025 | brakes | disc | R | 0.16×0.16×0.00 | 0.55, 0.34, 0.07 | 256 | brake.disc R | steel |
| brakes_0026 | brakes | disc | F | 0.16×0.16×0.00 | -0.57, 0.34, 0.07 | 256 | brake.disc F | steel |
| cabin_0040 | cabin | brake.lever | L | 0.02×0.01×0.10 | -0.35, 1.00, 0.25 | 588 | brake.lever L | black plastic |
| cabin_0041 | cabin | brake.lever | R | 0.02×0.01×0.10 | -0.35, 1.00, -0.25 | 588 | brake.lever R | black plastic |
| cabin_0038 | cabin | display |  | 0.06×0.05×0.09 | -0.45, 1.06, 0.00 | 588 | display | display |
| cabin_0044 | cabin | grip | L | 0.06×0.04×0.11 | -0.30, 1.02, 0.28 | 80 | grip L | rubber |
| cabin_0045 | cabin | grip | R | 0.06×0.04×0.11 | -0.30, 1.02, -0.28 | 80 | grip R | rubber |
| cabin_0009 | cabin | handlebar |  | 0.16×0.03×0.61 | -0.36, 1.02, 0.00 | 2688 | handlebar | aluminium |
| cabin_0016 | cabin | saddle |  | 0.29×0.07×0.14 | 0.26, 0.94, 0.00 | 1520 | saddle | saddle |
| cabin_0032 | cabin | seatpost |  | 0.09×0.19×0.03 | 0.22, 0.82, 0.00 | 80 | seatpost | aluminium |
| cabin_0027 | cabin | stem |  | 0.05×0.17×0.03 | -0.41, 0.94, 0.00 | 896 | stem | aluminium |
| drive_0039 | drive | bb.axle |  | 0.02×0.02×0.16 | 0.05, 0.30, 0.00 | 80 | bb.axle | steel |
| drive_0010 | drive | cable |  | 0.57×0.08×0.06 | 0.24, 0.30, 0.06 | 1024 | cable.motor | cable |
| drive_0037 | drive | cable |  | 0.05×0.11×0.02 | -0.08, 0.39, 0.04 | 384 | cable.battery | cable |
| drive_0005 | drive | chain |  | 0.63×0.18×0.01 | 0.27, 0.30, -0.06 | 5120 | chain | steel |
| drive_0023 | drive | chainring |  | 0.18×0.18×0.00 | 0.05, 0.30, -0.06 | 604 | chainring | aluminium |
| drive_0052 | drive | cog |  | 0.08×0.08×0.00 | 0.55, 0.34, -0.06 | 252 | cog | steel |
| drive_0031 | drive | controller |  | 0.12×0.09×0.06 | -0.09, 0.30, 0.00 | 588 | controller | black plastic |
| drive_0029 | drive | crank | L | 0.17×0.02×0.01 | 0.14, 0.30, 0.07 | 588 | crank L | aluminium |
| drive_0030 | drive | crank | R | 0.17×0.02×0.01 | -0.04, 0.30, -0.07 | 588 | crank R | aluminium |
| drive_0022 | drive | motor.hub |  | 0.20×0.20×0.07 | 0.55, 0.34, 0.00 | 256 | motor.hub | motor casing |
| drive_0028 | drive | motor.stator |  | 0.16×0.16×0.05 | 0.55, 0.34, 0.00 | 192 | motor.stator | copper |
| drive_0035 | drive | pedal | L | 0.07×0.02×0.10 | 0.22, 0.30, 0.14 | 588 | pedal L | black plastic |
| drive_0036 | drive | pedal | R | 0.07×0.02×0.10 | -0.12, 0.30, -0.14 | 588 | pedal R | black plastic |
| wheels_0043 | wheels | hub | F | 0.05×0.05×0.10 | -0.57, 0.34, 0.00 | 128 | hub F | aluminium |
| wheels_0002 | wheels | rim | F | 0.59×0.59×0.04 | -0.57, 0.34, 0.00 | 2880 | rim F | aluminium |
| wheels_0003 | wheels | rim | R | 0.59×0.59×0.04 | 0.55, 0.34, 0.00 | 2880 | rim R | aluminium |
| wheels_0007 | wheels | spokes | F | 0.56×0.56×0.07 | -0.57, 0.34, 0.00 | 640 | spokes F | steel |
| wheels_0008 | wheels | spokes | R | 0.56×0.56×0.06 | 0.55, 0.34, 0.00 | 640 | spokes R | steel |
| wheels_0000 | wheels | tire | F | 0.67×0.67×0.05 | -0.57, 0.34, 0.00 | 5760 | tire F | rubber |
| wheels_0001 | wheels | tire | R | 0.67×0.67×0.05 | 0.55, 0.34, 0.00 | 5760 | tire R | rubber |

## Tổng hợp

- wheels/tire: 2
- wheels/rim: 2
- wheels/spokes: 2
- drive/cable: 2
- body/fender: 2
- body/fork.leg: 2
- body/stay.seat: 2
- body/stay.chain: 2
- brakes/disc: 2
- drive/crank: 2
- drive/pedal: 2
- cabin/brake.lever: 2
- cabin/grip: 2
- brakes/caliper: 2
- battery/battery.cells: 2
- body/frame.down: 1
- drive/chain: 1
- body/rack: 1
- cabin/handlebar: 1
- battery/battery.case: 1
- cabin/saddle: 1
- body/frame.seat: 1
- drive/motor.hub: 1
- drive/chainring: 1
- body/kickstand: 1
- cabin/stem: 1
- drive/motor.stator: 1
- drive/controller: 1
- cabin/seatpost: 1
- body/fork.crown: 1
- body/frame.head: 1
- cabin/display: 1
- drive/bb.axle: 1
- body/light.rear: 1
- wheels/hub: 1
- body/frame.bb: 1
- body/light.front: 1
- drive/cog: 1
