import { Separator } from './ui/separator'
import { Card, CardContent } from './ui/card'

export default function DonationSection() {
  return (
    <section>
      <Separator className='w-[980px] h-1 bg-[#1d8438]' />
      <div className='flex gap-8 mt-8'>
        <Card className='w-[470px] h-[150px] p-0 rounded-none border-0'>
          <CardContent className='p-0'>
            <div className='relative w-full h-[150px]'>
              <img className='w-full h-full object-cover' alt='Lukasz szmigiel' src='/donain_1.png' />
              <div className='absolute inset-0 p-4 flex flex-col'>
                <h3 className="text-shadow-md font-['Roboto',Helvetica] font-normal text-white text-2xl">Donationer til Dato</h3>
                <p className="font-['Roboto',Helvetica] font-normal text-white text-base mt-1">Sammen med dig har vi siden starten indsamlet:</p>
                <p className="text-shadow-md font-['Roboto',Helvetica] font-normal text-[#00a676] text-[32px] text-right mt-2">452.231,50 kr</p>
                <p className="font-['Roboto',Helvetica] font-normal text-white text-[11px] mt-auto">Tak fordi du handler brugt, med omtanke for klimaet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='w-[470px] h-[150px] p-0 rounded-none border-0'>
          <CardContent className='p-0'>
            <div className='relative w-full h-[150px] bg-[url("/donain_2.png")] bg-cover bg-center'>
              <div className='absolute inset-0 bg-[#00000040] p-4 flex flex-col'>
                <h3 className="font-['Roboto',Helvetica] font-normal text-white text-2xl">Donationer i år</h3>
                <p className="font-['Roboto',Helvetica] font-normal text-white text-base mt-1">Sammen med dig har vi i år indsamlet:</p>
                <p className="text-shadow-md font-['Roboto',Helvetica] font-normal text-[#00a676] text-[32px] text-right mt-2">112.452,75 kr</p>
                <p className="font-['Roboto',Helvetica] font-normal text-white text-[11px] mt-auto">Tak fordi du handler brugt, med omtanke for jorden</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
