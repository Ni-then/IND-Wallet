banking-webhook : 3000
hdfc-bank : 3001
user-side-app : 3002
merchant-app : 3003


yrr i need a direction 

jo mene sir seh sikha tha woh flow tha

wallet seh amount , bank select click on pay , redirect to the /hdfc and then my fake bank webhook hit the request and then trnsaction sucess

but i am using this flow : wallet seh amount , bank select click on pay , redirect to the my fake hdfc website i am using turborepo and hdfc app host on 3001

and then user redirect to my fake hdfc they need to login userId , password , then banking-webhook req will send and transaction become correct

but i am confuse eseh kaise kru

turborepo

apps



/ hdfc-bank ( user enter the userId & psw then redirect to the /processing route and continue then i will use createOnRampTransaction (amount , provider) and yeh mai db meh add kr duga but ofcourse status : processing hoga means balance abhi add nahi hoga 

after that mera /hdfc ka webhook es req ko hit krega , and then bank seh money - , and balance meh add ho jayegi and our onRampTxn done

)

/user-side-app ( from this user enter the amount , select bank) redirect to the other app hdfc/login (ofcourse my fake app)





kya mera flow sahi hai ??

