# reaction-facebook
robot untuk melakukan reaction status facebook.
saat ini hanya bisa random reaction.

# kebutuhan
1. install nodejs
2. install npm
3. module cheerio
4. module axios
6. module dotenv

# cara jalankan bot ?
1. clone "git clone https://github.com/ifur404/reaction-facebook.git" atau download zip
2. masuk folder "cd reaction-facebook" kemudian install module "npm install"
3. edit file .env ganti "your cookies" dengan cookie facebookmu contoh cookie "_fbp=fb.1.15962491691087.16358513736; datr=yIYSX2_hiD21KkLjF0eZfQ3IxL; sb=yIYSXwNoFle1fz7OgpYaU2wVpq; c_user=100007116703410; xs=6%3ARQuA7PMuZEzvjg%3A2%3A112650904%3A11112%3A11126; fr=s.AWXsbDasftYuSEIH6tFJT21JBRXTYrI.BfEobI.kK.F83.0.120.BfOj12fX.AWVb123-m_" dan edit TYPE=1 dengan type reaction yang kamu mau, jika mau acak pake 7 contoh TYPE=7
4. jalankan "node app.js" atau bisa menggunakan pm2 sebagai manajement proses


# pertanyaan dan jawaban !
apakah bisa di jalankan di android ? 
* bisa menggunakan termux

bagaimana ambil cookie facebooknya ?
* kalau saya login ke mbasic.facebook.com di desktop trus masuk inspect element => network => mbasic.facebook.com copy yang ambil sebagai modejs fetch => trus ambil header cookies.

ya udah sih gtuh aja, klau ada pertanyaan lain jangan kontak saya kecuali mau donasi :p