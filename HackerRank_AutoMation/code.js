module.exports={
    answers:[
        `#include<bits/stdc++.h>
        using namespace std;
        int main(){
            int n;
            cin>>n;
            vector<int> array(n);
            int s=0;
            for(int i=0;i<n;i++){
                cin>>array[i];
                s+=array[i];
            }
            cout<<s;
            return 0;
        }
        `
    ]
}