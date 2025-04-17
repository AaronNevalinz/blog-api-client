import React from 'react'

export default function Comment() {
  return (
    <div>
        <div className="flex items-center gap-x-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-xs font-bold font-poppins">Aaron Nevalinz</h1>
                <p className="text-xs">3 hours ago</p>
            </div>
        </div>
        <p className="p-2">
            Yeah, you're right, I'm afraid to make that step. Your article, though, gave me useful insights to move, so thank you for this, Matt!
        </p>
    </div>
  )
}
