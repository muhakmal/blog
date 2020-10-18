---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Simple Caesar Cipher in C#"
subtitle: ""
summary: ""
authors: [Muhamad Akmal]
tags: [caesar cipher, programming, C Sharp, security]
categories: [Programming, Network Security]
date: 2017-06-09T18:49:01+07:00
lastmod: 2018-06-14T18:49:01+07:00
featured: false
draft: false
aliases: "/post/simple-caesar-cipher-in-c-sharp/"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---
Postingan ini merupakan bagian dari tugas Network Security. Membuat program simpel encrypt dan decrypt Program Caesar Cipher dengan bahasa pemrograman C#

#### Encrypt

### `EncryptForm.cs`

```C#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void textChiper_TextChanged(object sender, EventArgs e)
        {
        }
        private void btnChiper_Click(object sender, EventArgs e)
        {   
            try{
                string _string = textPlain.Text; //input string yang ingindi chiper
                string _encode = ""; //penampung string yang sudah di cipher
                int num = 0; //inisialisasi variabel utk kolom key sebagai flag chiper
                num = int.Parse(textKey.Text); // mengubah atau mengconvert string menjadi menjadi int agar bisad di loop
                for (int i = 0; i < _string.Length; i++)  //loop dari panjang string
                {
                    _encode += (char)(_string[i] + num); //loop enkripsi string dimana string diloop berdasarkan char ascii ditambah dengan flag sesuai key yang diinput
                }
                textChiper.Text = _encode; //memasukan hasil ciphertext ke kolom bar ciphertext     
            }
            catch (Exception ex){
                MessageBox.Show(ex.Message,"Input Key",MessageBoxButtons.OK,MessageBoxIcon.Error); //trycatch error apabila key tidak dimasukkan
            }
        }
        private void textPlain_TextChanged(object sender, EventArgs e)
        {
        }
        private void textKey_TextChanged(object sender, EventArgs e){}
        private void btnCopy_Click(object sender, EventArgs e)
        {
            try{
                Clipboard.SetText(textChiper.Text);
            }
            catch(Exception ex){
                MessageBox.Show(ex.Message,"Input plain text",MessageBoxButtons.OK,MessageBoxIcon.Error);
            }
        }       
    }
}
```

##### `EncrpytForm.Designer.cs`

```C#
namespace WindowsFormsApplication1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }
        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.label1 = new System.Windows.Forms.Label();
            this.textPlain = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.textChiper = new System.Windows.Forms.TextBox();
            this.btnChiper = new System.Windows.Forms.Button();
            this.textKey = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.btnCopy = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(123, 133);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(0, 13);
            this.label1.TabIndex = 0;
            // 
            // textPlain
            // 
            this.textPlain.AccessibleName = "";
            this.textPlain.Location = new System.Drawing.Point(74, 12);
            this.textPlain.Name = "textPlain";
            this.textPlain.Size = new System.Drawing.Size(141, 20);
            this.textPlain.TabIndex = 1;
            this.textPlain.Text = "Insert plain text";
            this.textPlain.TextChanged += new System.EventHandler(this.textPlain_TextChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(8, 15);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(60, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Plain Text :";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(1, 67);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(67, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "Chiper Text :";
            // 
            // textChiper
            // 
            this.textChiper.Location = new System.Drawing.Point(74, 64);
            this.textChiper.Name = "textChiper";
            this.textChiper.ReadOnly = true;
            this.textChiper.Size = new System.Drawing.Size(141, 20);
            this.textChiper.TabIndex = 3;
            this.textChiper.TextChanged += new System.EventHandler(this.textChiper_TextChanged);
            // 
            // btnChiper
            // 
            this.btnChiper.AutoSize = true;
            this.btnChiper.Location = new System.Drawing.Point(74, 90);
            this.btnChiper.Name = "btnChiper";
            this.btnChiper.Size = new System.Drawing.Size(75, 23);
            this.btnChiper.TabIndex = 5;
            this.btnChiper.Text = "Chiper";
            this.btnChiper.UseVisualStyleBackColor = true;
            this.btnChiper.Click += new System.EventHandler(this.btnChiper_Click);
            // 
            // textKey
            // 
            this.textKey.Location = new System.Drawing.Point(74, 38);
            this.textKey.Name = "textKey";
            this.textKey.Size = new System.Drawing.Size(141, 20);
            this.textKey.TabIndex = 9;
            this.textKey.Text = "Insert any number";
            this.textKey.TextChanged += new System.EventHandler(this.textKey_TextChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(37, 41);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(31, 13);
            this.label5.TabIndex = 10;
            this.label5.Text = "Key :";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Futura Bk BT", 6.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.Location = new System.Drawing.Point(88, 129);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(159, 11);
            this.label8.TabIndex = 15;
            this.label8.Text = "Made for Network Security Assignment";
            // 
            // btnCopy
            // 
            this.btnCopy.AutoSize = true;
            this.btnCopy.Location = new System.Drawing.Point(155, 90);
            this.btnCopy.Name = "btnCopy";
            this.btnCopy.Size = new System.Drawing.Size(60, 23);
            this.btnCopy.TabIndex = 16;
            this.btnCopy.Text = "Copy";
            this.btnCopy.UseVisualStyleBackColor = true;
            this.btnCopy.Click += new System.EventHandler(this.btnCopy_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.ClientSize = new System.Drawing.Size(259, 149);
            this.Controls.Add(this.btnCopy);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.textKey);
            this.Controls.Add(this.btnChiper);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.textChiper);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.textPlain);
            this.Controls.Add(this.label1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Encrypt | Simple Caesar Cipher";
            this.ResumeLayout(false);
            this.PerformLayout();
        }
        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textPlain;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textChiper;
        private System.Windows.Forms.Button btnChiper;
        private System.Windows.Forms.TextBox textKey;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Button btnCopy;
    }
}

```

##### `ProgramEncrypt.cs`

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
```



#### Decrypt

##### `DecryptForm.cs`

```C#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void textChiper_TextChanged(object sender, EventArgs e)
        {
         
        }
        private void btnEnchiper_Click(object sender, EventArgs e)
        {
            try{
                string _decodestring = textChiper2.Text; //mengambil data string yang telah dicipher
                string _decode = ""; //variabel penampung string yang akan di dekripsi
                int number = 0; //key atau flag yang digunakan sebagai secret key untuk mendekripsi cipher text
            
                number = int.Parse(textKey2.Text); //inisialisasi variabel dari key yang akan di loop

                for (int i =0; i<_decodestring.Length; i++) //loop dari panjang string sesuai key
                {
                    _decode += (char)(_decodestring[i] - number);//loop dekripsi dengan key flag untuk mendekripsi dikurang dari key flag. apabila terjadi perbedaan dalam key, hasil akan berbeda dengan plaintext yang diinput oleh user
                }

                textEnchiper.Text = _decode; //memasukkan hasil dekripsi ke kolom decipher text
            }
            catch(Exception ex){
             MessageBox.Show(ex.Message,"Paste chiper text",MessageBoxButtons.OK,MessageBoxIcon.Error);
            }
        }
        private void textKey_TextChanged(object sender, EventArgs e)
        {
        }
        private void btnPaste_Click(object sender, EventArgs e)
        {
            textChiper2.Text = Clipboard.GetText();  
        }        
    }
}
```

##### `DecryptForm.Designer.cs`

```c#
namespace WindowsFormsApplication1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.label1 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.textEnchiper = new System.Windows.Forms.TextBox();
            this.btnEnchiper = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.textKey2 = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.textChiper2 = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.btnPaste = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(123, 133);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(0, 13);
            this.label1.TabIndex = 0;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(6, 67);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(80, 13);
            this.label4.TabIndex = 7;
            this.label4.Text = "Dechiper Text :";
            // 
            // textEnchiper
            // 
            this.textEnchiper.Location = new System.Drawing.Point(91, 64);
            this.textEnchiper.Name = "textEnchiper";
            this.textEnchiper.ReadOnly = true;
            this.textEnchiper.Size = new System.Drawing.Size(141, 20);
            this.textEnchiper.TabIndex = 6;
            // 
            // btnEnchiper
            // 
            this.btnEnchiper.Location = new System.Drawing.Point(157, 90);
            this.btnEnchiper.Name = "btnEnchiper";
            this.btnEnchiper.Size = new System.Drawing.Size(75, 23);
            this.btnEnchiper.TabIndex = 8;
            this.btnEnchiper.Text = "Dechiper";
            this.btnEnchiper.UseVisualStyleBackColor = true;
            this.btnEnchiper.Click += new System.EventHandler(this.btnEnchiper_Click);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(54, 41);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(31, 13);
            this.label6.TabIndex = 12;
            this.label6.Text = "Key :";
            // 
            // textKey2
            // 
            this.textKey2.Location = new System.Drawing.Point(91, 38);
            this.textKey2.Name = "textKey2";
            this.textKey2.Size = new System.Drawing.Size(141, 20);
            this.textKey2.TabIndex = 11;
            this.textKey2.Text = "Insert number above";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(18, 15);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(67, 13);
            this.label7.TabIndex = 14;
            this.label7.Text = "Chiper Text :";
            // 
            // textChiper2
            // 
            this.textChiper2.Location = new System.Drawing.Point(91, 12);
            this.textChiper2.Name = "textChiper2";
            this.textChiper2.Size = new System.Drawing.Size(141, 20);
            this.textChiper2.TabIndex = 13;
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Futura Bk BT", 6.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.Location = new System.Drawing.Point(89, 133);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(159, 11);
            this.label8.TabIndex = 15;
            this.label8.Text = "Made for Network Security Assignment";
            // 
            // btnPaste
            // 
            this.btnPaste.Location = new System.Drawing.Point(91, 90);
            this.btnPaste.Name = "btnPaste";
            this.btnPaste.Size = new System.Drawing.Size(59, 23);
            this.btnPaste.TabIndex = 16;
            this.btnPaste.Text = "Paste";
            this.btnPaste.UseVisualStyleBackColor = true;
            this.btnPaste.Click += new System.EventHandler(this.btnPaste_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.ClientSize = new System.Drawing.Size(259, 149);
            this.Controls.Add(this.btnPaste);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.textChiper2);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.textKey2);
            this.Controls.Add(this.btnEnchiper);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.textEnchiper);
            this.Controls.Add(this.label1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Decrypt | Simple Caesar Cipher";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox textEnchiper;
        private System.Windows.Forms.Button btnEnchiper;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox textKey2;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox textChiper2;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Button btnPaste;

    }
}

```

##### `ProgramDecrypt.cs`

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
```

[Download Source Code](https://drive.google.com/open?id=0B8Aag2QvOdwqWnF5Q1ZZU3k4ZE0)

Semoga berguna :)