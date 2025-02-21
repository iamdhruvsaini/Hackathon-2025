import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Link } from 'react-router-dom'
import stadium from '@/assets/Images/stadium.webp'
import phoneStadium from '@/assets/Images/stadium-phone.jpeg'

const AdminLogin = () => {
  return (
    <section className="relative flex items-center justify-center h-screen w-full">
        <img src={phoneStadium} alt="" className='absolute w-full h-full' />
        <Card className="relative z-10 w-full max-w-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account. <br />
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button
                            
                            className="w-full"
                            >

                            <span className="ml-2">Sign in</span>
                        </Button>
                    </div>
                </CardFooter>
        </Card>
    </section>
  )
}

export default AdminLogin