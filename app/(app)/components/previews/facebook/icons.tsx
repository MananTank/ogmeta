import { useId } from 'react'

export const ShareArrowIcon = ({
  className = '',
  color = '#000000',
  strokeWidth = 2,
  rotation = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
}) => {
  const transforms = []
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`)
  if (flipHorizontal) transforms.push('scaleX(-1)')
  if (flipVertical) transforms.push('scaleY(-1)')

  const viewBoxSize = 24 + padding * 2
  const viewBoxOffset = -padding
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <g fill="none">
        <path
          d="M22 10.981L15.027 2v4.99C3.075 6.99 1.711 16.678 2.043 22l.007-.041c.502-2.685.712-6.986 12.977-6.986v4.99L22 10.98z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export function FbLikeIcon(props: React.SVGProps<SVGSVGElement>) {
  const gradientId = useId()
  const radialGradientId = useId()
  const radialGradientId2 = useId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        d="M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z"
        fill={`url(#${radialGradientId})`}
      />
      <path
        d="M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z"
        fill={`url(#${radialGradientId2})`}
        fillOpacity={0.5}
      />
      <path
        d="M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z"
        fill="#fff"
      />
      <defs>
        <radialGradient
          id={radialGradientId}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 .0005 8) scale(7.99958)"
        >
          <stop offset={0.5618} stopColor="#0866FF" stopOpacity={0} />
          <stop offset={1} stopColor="#0866FF" stopOpacity={0.1} />
        </radialGradient>
        <radialGradient
          id={radialGradientId2}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45 -4.5257 10.9237) scale(10.1818)"
        >
          <stop offset={0.3143} stopColor="#02ADFC" />
          <stop offset={1} stopColor="#02ADFC" stopOpacity={0} />
        </radialGradient>
        <linearGradient
          id={gradientId}
          x1={2.3989}
          y1={2.3999}
          x2={13.5983}
          y2={13.5993}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#02ADFC" />
          <stop offset={0.5} stopColor="#0866FF" />
          <stop offset={1} stopColor="#2B7EFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FbSmileIcon(props: React.SVGProps<SVGSVGElement>) {
  const gradientId = useId()
  const radialGradientId = useId()
  const radialGradientId2 = useId()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <g clipPath="url(#clip0_15251_63610)">
        <path
          d="M15.9953 7.9996c0 4.418-3.5816 7.9996-7.9996 7.9996S-.004 12.4176-.004 7.9996 3.5776 0 7.9957 0c4.418 0 7.9996 3.5815 7.9996 7.9996Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z"
          fill="url(#paint1_radial_15251_63610)"
        />
        <path
          d="M15.9953 7.9996c0 4.418-3.5816 7.9996-7.9996 7.9996S-.004 12.4176-.004 7.9996 3.5776 0 7.9957 0c4.418 0 7.9996 3.5815 7.9996 7.9996Z"
          fill="url(#paint2_radial_15251_63610)"
          fillOpacity={0.8}
        />
        <path
          d="M12.5278 8.1957c.4057.1104.6772.4854.623.9024-.3379 2.6001-2.5167 4.9012-5.1542 4.9012s-4.8163-2.3011-5.1542-4.9012c-.0542-.417.2173-.792.623-.9024.8708-.237 2.5215-.596 4.5312-.596 2.0098 0 3.6605.359 4.5312.596Z"
          fill="#4B280E"
        />
        <path
          d="M11.5809 12.3764c-.9328.9843-2.1948 1.6228-3.5841 1.6228-1.3892 0-2.6512-.6383-3.5839-1.6225a1.5425 1.5425 0 0 0-.016-.0174c.4475-1.0137 2.2-1.3599 3.5999-1.3599 1.4 0 3.1514.3468 3.5998 1.3599l-.0157.0171Z"
          fill="url(#paint3_linear_15251_63610)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3049 5.8793c.1614-1.1485-.6387-2.2103-1.7872-2.3717l-.0979-.0138c-1.1484-.1614-2.2103.6388-2.3717 1.7872l-.0163.1164a.5.5 0 0 0 .9902.1392l.0163-.1164c.0846-.6016.6408-1.0207 1.2424-.9362l.0978.0138c.6016.0845 1.0207.6407.9362 1.2423l-.0164.1164a.5.5 0 0 0 .9903.1392l.0163-.1164ZM2.6902 5.8793c-.1614-1.1485.6387-2.2103 1.7872-2.3717l.0979-.0138c1.1484-.1614 2.2103.6388 2.3717 1.7872l.0164.1164a.5.5 0 1 1-.9903.1392l-.0163-.1164c-.0846-.6016-.6408-1.0207-1.2423-.9362l-.098.0138c-.6015.0845-1.0206.6407-.936 1.2423l.0163.1164a.5.5 0 0 1-.9902.1392l-.0164-.1164Z"
          fill="#1C1C1D"
        />
      </g>
      <defs>
        <radialGradient
          id={radialGradientId}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 7.9992 -7.99863 0 7.9986 7.9992)"
        >
          <stop offset={0.5637} stopColor="#FF5758" stopOpacity={0} />
          <stop offset={1} stopColor="#FF5758" stopOpacity={0.1} />
        </radialGradient>
        <radialGradient
          id={radialGradientId2}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45 -4.5272 10.9202) scale(10.1818)"
        >
          <stop stopColor="#FFF287" />
          <stop offset={1} stopColor="#FFF287" stopOpacity={0} />
        </radialGradient>
        <linearGradient
          id={gradientId}
          x1={2.396}
          y1={2.3999}
          x2={13.5954}
          y2={13.5993}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF287" />
          <stop offset={1} stopColor="#F68628" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1={5.1979}
          y1={10.7996}
          x2={5.245}
          y2={14.2452}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF60A4" />
          <stop offset={0.2417} stopColor="#FA2E3E" />
          <stop offset={1} stopColor="#BC0A26" />
        </linearGradient>
        <clipPath id="clip0_15251_63610">
          <path fill="#fff" d="M-.002 0h16v15.9992h-16z" />
        </clipPath>
      </defs>
    </svg>
  )
}
